using System;
using System.Drawing;
using System.Windows.Forms;


namespace RadiologyReportEvaluation.Forms
{
    // Custom progress bar to display percentage or custom text
    public class CustomProgressBar : ProgressBar
    {
        public string DisplayText { get; set; }
        public CustomProgressBar()
        {
            this.SetStyle(ControlStyles.UserPaint, true);
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Rectangle rect = this.ClientRectangle;
            Graphics g = e.Graphics;

            ProgressBarRenderer.DrawHorizontalBar(g, rect);
            rect.Inflate(-3, -3);
            if (this.Value > 0)
            {
                Rectangle clip = new Rectangle(rect.X, rect.Y, (int)Math.Round((float)rect.Width * ((float)this.Value / this.Maximum)), rect.Height);
                ProgressBarRenderer.DrawHorizontalChunks(g, clip);
            }

            string text = this.DisplayText == null ? this.Value.ToString() + "%" : this.DisplayText;
            using (Font f = new Font("Arial", 10, FontStyle.Bold))
            {
                SizeF len = g.MeasureString(text, f);
                Point location = new Point((int)((rect.Width - len.Width) / 2), (int)((rect.Height - len.Height) / 2));
                g.DrawString(text, f, Brushes.Black, location);
            }
        }
    }
}
