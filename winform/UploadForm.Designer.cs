namespace RadiologyReportEvaluation
{
    partial class UploadForm
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
            this.labelFile = new System.Windows.Forms.Label();
            this.textBoxFile = new System.Windows.Forms.TextBox();
            this.buttonSelectFile = new System.Windows.Forms.Button();
            this.labelFileDescription = new System.Windows.Forms.Label();
            this.openFileDialog = new System.Windows.Forms.OpenFileDialog();
            this.buttonUpload = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // labelFile
            // 
            this.labelFile.AutoSize = true;
            this.labelFile.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelFile.Location = new System.Drawing.Point(24, 30);
            this.labelFile.Name = "labelFile";
            this.labelFile.Size = new System.Drawing.Size(56, 32);
            this.labelFile.TabIndex = 0;
            this.labelFile.Text = "File:";
            // 
            // textBoxFile
            // 
            this.textBoxFile.Font = new System.Drawing.Font("Segoe UI", 9.857143F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxFile.Location = new System.Drawing.Point(98, 27);
            this.textBoxFile.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.textBoxFile.Name = "textBoxFile";
            this.textBoxFile.Size = new System.Drawing.Size(810, 38);
            this.textBoxFile.TabIndex = 1;
            // 
            // buttonSelectFile
            // 
            this.buttonSelectFile.Font = new System.Drawing.Font("Segoe UI", 9.857143F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonSelectFile.Location = new System.Drawing.Point(926, 25);
            this.buttonSelectFile.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.buttonSelectFile.Name = "buttonSelectFile";
            this.buttonSelectFile.Size = new System.Drawing.Size(94, 53);
            this.buttonSelectFile.TabIndex = 2;
            this.buttonSelectFile.Text = "Select";
            this.buttonSelectFile.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.buttonSelectFile.UseVisualStyleBackColor = true;
            this.buttonSelectFile.Click += new System.EventHandler(this.buttonSelectFile_Click);
            // 
            // labelFileDescription
            // 
            this.labelFileDescription.AutoSize = true;
            this.labelFileDescription.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.labelFileDescription.Location = new System.Drawing.Point(98, 102);
            this.labelFileDescription.Name = "labelFileDescription";
            this.labelFileDescription.Size = new System.Drawing.Size(726, 32);
            this.labelFileDescription.TabIndex = 3;
            this.labelFileDescription.Text = "Upload an Excel file that includes patient information and findings.";
            // 
            // openFileDialog
            // 
            this.openFileDialog.Filter = "Excel|*.xlsx";
            // 
            // buttonUpload
            // 
            this.buttonUpload.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.buttonUpload.Location = new System.Drawing.Point(98, 159);
            this.buttonUpload.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.buttonUpload.Name = "buttonUpload";
            this.buttonUpload.Size = new System.Drawing.Size(115, 54);
            this.buttonUpload.TabIndex = 4;
            this.buttonUpload.Text = "Upload";
            this.buttonUpload.UseVisualStyleBackColor = true;
            this.buttonUpload.Click += new System.EventHandler(this.buttonUpload_Click);
            // 
            // UploadForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 30F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.buttonUpload);
            this.Controls.Add(this.labelFileDescription);
            this.Controls.Add(this.buttonSelectFile);
            this.Controls.Add(this.textBoxFile);
            this.Controls.Add(this.labelFile);
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "UploadForm";
            this.Size = new System.Drawing.Size(1143, 232);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label labelFile;
        private System.Windows.Forms.TextBox textBoxFile;
        private System.Windows.Forms.Button buttonSelectFile;
        private System.Windows.Forms.Label labelFileDescription;
        private System.Windows.Forms.OpenFileDialog openFileDialog;
        private System.Windows.Forms.Button buttonUpload;
    }
}
