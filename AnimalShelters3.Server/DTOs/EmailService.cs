using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AnimalShelters3.Server.Models; // Assuming this namespace contains your DbContext
using Microsoft.EntityFrameworkCore;

public class EmailService
{
    private readonly MyDbContext _context; // Inject the DbContext

    public EmailService(MyDbContext context)
    {
        _context = context;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body, int senderUserId)
    {
        // Fetch sender email from the database using the sender's UserId
        var senderUser = await _context.Users.FirstOrDefaultAsync(u => u.UserId == senderUserId);

        if (senderUser == null || string.IsNullOrEmpty(senderUser.Email))
        {
            throw new InvalidOperationException("Sender email not found.");
        }

        string fromEmail = senderUser.Email;

        var smtpClient = new SmtpClient("smtp.your-email-provider.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("najlaaalsmadiorange@gmail.com", "dafe eshs yglu fkij"),
            EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmail),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };

        mailMessage.To.Add(toEmail);

        await smtpClient.SendMailAsync(mailMessage);
    }
}
