using AnimalShelters3.Server.Models;

namespace AnimalShelters3.Server.DTOs
{
    public class AnimalDto
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Temperament { get; set; }

        public int? ShelterId { get; set; }

        public long? CategoryId { get; set; }

    }
}
