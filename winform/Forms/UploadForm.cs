﻿using System;
using System.Linq;
using System.Windows.Forms;
using System.IO;

using RadiologyReportEvaluation.Data;

namespace RadiologyReportEvaluation.Forms
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

            try
            {
                ReportFile.Instance.LoadFile(fileName);
            }
            catch (Exception)
            {
                MessageBox.Show("Failed to parse the file, please check the file format.");
                return;
            }

            bool hasData = ReportFile.Instance.GetRows().Count > 0;
            if (!hasData)
            {
                MessageBox.Show("No data found in the file.");
                return;
            }

            this.NavForm("score");
        }

        private bool CheckFileExist(string fileName)
        {
            return File.Exists(fileName);
        }
    }
}
