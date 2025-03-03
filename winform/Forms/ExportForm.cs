using System;
using System.Windows.Forms;

using RadiologyReportEvaluation.Data;

namespace RadiologyReportEvaluation.Forms
{
    public partial class ExportForm: FormBase
    {
        public ExportForm()
        {
            InitializeComponent();

            this.AcceptButton = this.buttonExport;
        }

        private void buttonExport_Click(object sender, EventArgs e)
        {
            if (this.folderBrowserDialog.ShowDialog() == DialogResult.OK)
            {
                string saveFolder = this.folderBrowserDialog.SelectedPath;
                ReportFile.Instance.SaveFile(saveFolder);
                MessageBox.Show("Reports have been exported.", "Export", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void buttonUpload_Click(object sender, EventArgs e)
        {
            this.NavForm("upload");
        }
    }
}
