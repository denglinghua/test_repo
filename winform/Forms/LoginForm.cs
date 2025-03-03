using System;
using System.Windows.Forms;

namespace RadiologyReportEvaluation.Forms
{
    public partial class LoginForm: FormBase
    {
        public LoginForm()
        {
            InitializeComponent();
            this.AcceptButton = this.buttonLogin;
        }

        private void buttonLogin_Click(object sender, EventArgs e)
        {
            string username = this.textBoxUsername.Text;
            if (string.IsNullOrEmpty(username))
            {
                MessageBox.Show("Please enter a username.");
            }
            else
            {
                this.NavForm("upload");
            }
        }
    }
}
