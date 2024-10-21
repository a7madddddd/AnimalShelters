using System;
using System.Collections.Generic;

namespace AnimalShelters3.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Image { get; set; }

    public bool? IsDeleted { get; set; }

    public string? Description { get; set; }

    public int? UserAge { get; set; }

    public string? UserAdderss { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();
}
