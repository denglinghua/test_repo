using System;
using System.Windows.Forms;

using RadiologyReportEvaluation.Forms;

namespace RadiologyReportEvaluation
{
    public partial class MainForm: Form
    {
        TableLayoutPanel tableLayoutPanel;
        public MainForm()
        {
            InitializeComponent();

            tableLayoutPanel = new TableLayoutPanel();
            tableLayoutPanel.Dock = DockStyle.Fill;
            tableLayoutPanel.ColumnCount = 1;
            tableLayoutPanel.RowCount = 1;
            tableLayoutPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
            tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 50F));

            this.Controls.Add(tableLayoutPanel);

            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;

            Start();
        }
        private void SwitchForm(FormBase form)
        {
            form.Anchor = AnchorStyles.None;
            this.tableLayoutPanel.Controls.Clear();
            this.tableLayoutPanel.Controls.Add(form, 0, 0);
            form.FormSwitch += onFormSwitch;
            if (form.AcceptButton != null)
            {
                this.AcceptButton = form.AcceptButton;
            }
        }

        private void onFormSwitch(object sender, FormSwitchEventArgs e)
        {
            FormBase newForm = this.GetForm(e.FormName);
            this.SwitchForm(newForm);
        }

        private void Start()
        {
            FormBase loginForm = this.GetForm("login");
            this.SwitchForm(loginForm);
        }

        private FormBase GetForm(string formName)
        {
            if (FormConfig.FormMappings.TryGetValue(formName, out string formTypeName))
            {
                Type formType = Type.GetType(formTypeName);
                if (formType != null)
                {
                    return (FormBase)Activator.CreateInstance(formType);
                }
            }
            throw new ArgumentException($"Form with name '{formName}' not found.");
        }
    }
}
