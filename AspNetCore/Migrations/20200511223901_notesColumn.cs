using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetCore.Migrations
{
    public partial class notesColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "ContactRecords",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "ContactRecords");
        }
    }
}
