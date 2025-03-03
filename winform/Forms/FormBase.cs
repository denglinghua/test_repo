using System;
using System.Drawing;
using System.Windows.Forms;

namespace RadiologyReportEvaluation.Forms
{
    public delegate void FormSwitchEventHandler(object sender, FormSwitchEventArgs e);

    public class FormSwitchEventArgs : EventArgs
    {
        public string FormName { get; }

        public FormSwitchEventArgs(string formName)
        {
            FormName = formName;
        }
    }

    public class FormBase : UserControl
    {
        public event FormSwitchEventHandler FormSwitch;
        public Button AcceptButton { get; protected set; }

        public FormBase() : base()
        {
            this.Font = SystemFonts.MessageBoxFont;
        }

        protected void NavForm(string formName)
        {
            FormSwitch?.Invoke(this, new FormSwitchEventArgs(formName));
        }
    }
}
