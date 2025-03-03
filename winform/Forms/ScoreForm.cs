using System;
using System.Linq;
using System.Windows.Forms;

using RadiologyReportEvaluation.Data;

namespace RadiologyReportEvaluation.Forms
{
    public partial class ScoreForm : FormBase
    {
        private int rowIndex = 0;
        private int totalRows = ReportFile.Instance.GetRows().Count;
        public ScoreForm()
        {
            InitializeComponent();

            this.AcceptButton = this.buttonNext;

            this.LoadRow();
        }

        private void buttonPrevious_Click(object sender, EventArgs e)
        {
            this.SaveScore();
            this.rowIndex--;
            this.LoadRow();
        }

        private void buttonNext_Click(object sender, EventArgs e)
        {
            if (!IsScored())
            {
                MessageBox.Show("Please score the report before moving on.");
                return;
            }

            this.SaveScore();
            this.rowIndex++;
            if (this.rowIndex == this.totalRows)
            {
                this.NavForm("export");
                return;
            }
            this.LoadRow();
        }

        private void LoadRow()
        {
            Row row = ReportFile.Instance.GetRow(rowIndex);
            this.ShowRow(row);
            this.UpdateProgress();
            this.SetButtonState();
        }

        private void SetButtonState()
        {
            this.buttonPrevious.Enabled = this.rowIndex > 0;
            this.buttonNext.Enabled = this.rowIndex < this.totalRows;
        }

        private void ShowRow(Row row)
        {
            this.textBoxFindings.Text = FormatText(row.Findings);
            this.textBoxImpressionA.Text = FormatText(row.ImpressionA);
            this.textBoxImpressionB.Text = FormatText(row.ImpressionB);
            this.textBoxReason.Text = row.ReasonForExam;
            this.labelGenderValue.Text = row.Gender;
            this.labelAgeValue.Text = row.Age;
            this.labelEthnicityValue.Text = row.Ethnicity;

            this.ratingAccuracy.Value = row.AccuracyRating;
            this.ratingQuality.Value = row.QualityRating;
            this.textBoxComment.Text = row.Comment;
        }

        private string FormatText(string text)
        {
            return text;
        }

        private void UpdateProgress()
        {
            int currentRow = this.rowIndex;
            this.progressBar.Value = (int)((double)currentRow / this.totalRows * 100);
        }

        private bool IsScored()
        {
            return this.ratingAccuracy.Value > 0 && this.ratingQuality.Value > 0;
        }

        private void SaveScore()
        {
            Row row = ReportFile.Instance.GetRow(this.rowIndex);
            row.AccuracyRating = this.ratingAccuracy.Value;
            row.QualityRating = this.ratingQuality.Value;
            row.Comment = this.textBoxComment.Text;
        }

        private void buttonUpload_Click(object sender, EventArgs e)
        {
            this.NavForm("upload");
        }
    }
}
