using System;
using System.Collections.Generic;

namespace AnimalShelters3.Server.Models;

public partial class Comment
{
    public long Id { get; set; }

    public long? PostId { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual Post? Post { get; set; }

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual User? User { get; set; }
}
