using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models
{
    public class TodoTask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

       
        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}

