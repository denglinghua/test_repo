using System;
using System.Collections.Generic;

namespace RadiologyReportEvaluation.Forms
{
    class FormConfig
    {
        public static readonly Dictionary<string, string> FormMappings = new Dictionary<string, string>()
        {
            { "login", "RadiologyReportEvaluation.Forms.LoginForm" },
            { "upload", "RadiologyReportEvaluation.Forms.UploadForm" },
            { "score", "RadiologyReportEvaluation.Forms.ScoreForm" },
            { "export", "RadiologyReportEvaluation.Forms.ExportForm" }
        };
    }
}