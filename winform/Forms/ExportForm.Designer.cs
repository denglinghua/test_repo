namespace RadiologyReportEvaluation.Forms
{
    partial class ExportForm
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.labelMsg = new System.Windows.Forms.Label();
            this.buttonExport = new System.Windows.Forms.Button();
            this.folderBrowserDialog = new System.Windows.Forms.FolderBrowserDialog();
            this.buttonUpload = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // labelMsg
            // 
            this.labelMsg.AutoSize = true;
            this.labelMsg.Font = new System.Drawing.Font("Segoe UI", 9.857143F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelMsg.Location = new System.Drawing.Point(25, 45);
            this.labelMsg.Name = "labelMsg";
            this.labelMsg.Size = new System.Drawing.Size(799, 32);
            this.labelMsg.TabIndex = 0;
            this.labelMsg.Text = "All records have been successfully scored. You can now export the results.";
            // 
            // buttonExport
            // 
            this.buttonExport.Font = new System.Drawing.Font("Segoe UI", 9.857143F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonExport.Location = new System.Drawing.Point(591, 118);
            this.buttonExport.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.buttonExport.Name = "buttonExport";
            this.buttonExport.Size = new System.Drawing.Size(211, 55);
            this.buttonExport.TabIndex = 1;
            this.buttonExport.Text = "Export to Excel";
            this.buttonExport.UseVisualStyleBackColor = true;
            this.buttonExport.Click += new System.EventHandler(this.buttonExport_Click);
            // 
            // buttonUpload
            // 
            this.buttonUpload.Font = new System.Drawing.Font("Segoe UI", 9.857143F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonUpload.Location = new System.Drawing.Point(31, 118);
            this.buttonUpload.Name = "buttonUpload";
            this.buttonUpload.Size = new System.Drawing.Size(255, 55);
            this.buttonUpload.TabIndex = 2;
            this.buttonUpload.Text = "Upload Another File";
            this.buttonUpload.UseVisualStyleBackColor = true;
            this.buttonUpload.Click += new System.EventHandler(this.buttonUpload_Click);
            // 
            // ExportForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 30F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.buttonUpload);
            this.Controls.Add(this.buttonExport);
            this.Controls.Add(this.labelMsg);
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "ExportForm";
            this.Size = new System.Drawing.Size(926, 211);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label labelMsg;
        private System.Windows.Forms.Button buttonExport;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog;
        private System.Windows.Forms.Button buttonUpload;
    }
}
