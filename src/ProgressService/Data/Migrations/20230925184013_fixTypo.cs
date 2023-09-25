using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProgressService.Data.Migrations
{
    /// <inheritdoc />
    public partial class fixTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserProp",
                table: "DayCounts",
                newName: "UserSub");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserSub",
                table: "DayCounts",
                newName: "UserProp");
        }
    }
}
