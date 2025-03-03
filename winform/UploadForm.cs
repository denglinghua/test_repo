using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace RadiologyReportEvaluation
{
    public partial class UploadForm : FormBase
    {
        public UploadForm()
        {
            InitializeComponent();

            this.AcceptButton = this.buttonUpload;
        }

        private void buttonSelectFile_Click(object sender, EventArgs e)
        {
            if (this.openFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                this.textBoxFile.Text = this.openFileDialog.FileName;
            }
        }

        private void buttonUpload_Click(object sender, EventArgs e)
        {
            string fileName = this.textBoxFile.Text;

            if (string.IsNullOrEmpty(fileName))
            {
                MessageBox.Show("Please select a file.");
                return;
            }

            if (!CheckFileExist(fileName))
            {
                MessageBox.Show("File does not exist.");

            }

            ReportFile.Instance.LoadFile(fileName);
            this.NavForm("score");
        }

        private bool CheckFileExist(string fileName)
        {
            return File.Exists(fileName);
        }
    }
}
