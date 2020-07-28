using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace TodoApp.API.Data
{
    public class Seed {
        public static void SeedUsers (UserManager<IdentityUser> userManager) {
            if (!userManager.Users.Any ()) {
                var userData = System.IO.File.ReadAllText ("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<IdentityUser>> (userData);

                foreach (var user in users) {
                    userManager.CreateAsync (user, "password").Wait ();
                }
            }
        }
    }
}