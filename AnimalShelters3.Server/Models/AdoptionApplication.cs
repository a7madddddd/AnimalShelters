using System;
using System.Collections.Generic;

namespace AnimalShelters3.Server.Models;

public partial class AdoptionApplication
{
    public int ApplicationId { get; set; }

    public int? UserId { get; set; }

    public int? AnimalId { get; set; }

    public string? Status { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public string? Message { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Animal? Animal { get; set; }

    public virtual User? User { get; set; }
}
