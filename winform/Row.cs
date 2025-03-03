using System;

namespace RadiologyReportEvaluation
{
    public class Row
    {
        public string Findings { get; }
        public string ImpressionA { get; }
        public string ImpressionB { get; }
        public string Ethnicity { get; }
        public string Gender { get; }
        public string ReasonForExam { get; }
        // Display only, so string
        public String Age { get; }
        public int AccuracyRating { get; set; }
        public int QualityRating { get; set; }
        public string Comment { get; set; }

        public Row(string findings, string impressionA, string impressionB, string ethnicity, string gender, string reasonForExam, string age)
        {
            Findings = findings;
            ImpressionA = impressionA;
            ImpressionB = impressionB;
            Ethnicity = ethnicity;
            Gender = gender;
            ReasonForExam = reasonForExam;
            Age = age;
        }
    }
}
