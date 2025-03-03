using System.Windows.Forms;

namespace RadiologyReportEvaluation.Forms
{
    public partial class RatingControl: UserControl
    {
        public int Value
        {
            get
            {
                foreach (RadioButton radioButton in flowLayoutPanel.Controls)
                {
                    if (radioButton.Checked)
                    {
                        return int.Parse(radioButton.Text);
                    }
                }
                return 0;
            }
            set
            {
                foreach (RadioButton radioButton in flowLayoutPanel.Controls)
                {
                    if (int.Parse(radioButton.Text) == value)
                    {
                        radioButton.Checked = true;
                    }
                    else
                    {
                        radioButton.Checked = false;
                    }
                }
            }
        }

        public RatingControl()
        {
            InitializeComponent();
            AddRadioButtons();
        }

     private void AddRadioButtons()
        {
            for (int i = 1; i <= 5; i++)
            {
                RadioButton radioButton = new RadioButton();
                radioButton.Text = i.ToString();
                radioButton.AutoSize = true;
                flowLayoutPanel.Controls.Add(radioButton);
            }
        }
    }
}
