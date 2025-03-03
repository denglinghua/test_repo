using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RadiologyReportEvaluation
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
