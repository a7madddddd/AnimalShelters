using System;
using System.Collections.Generic;

namespace AnimalShelters3.Server.Models;

public partial class Like
{
    public long Id { get; set; }

    public long? PostId { get; set; }

    public int? UserId { get; set; }

    public long? CommentId { get; set; }

    public virtual Comment? Comment { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User? User { get; set; }
}
