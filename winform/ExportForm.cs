using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using OfficeOpenXml;

namespace RadiologyReportEvaluation
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
