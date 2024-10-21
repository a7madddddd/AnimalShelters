using System;
using System.Collections.Generic;

namespace AnimalShelters3.Server.Models;

public partial class Shelter
{
    public int ShelterId { get; set; }

    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string Email { get; set; } = null!;

    public bool? Verified { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
