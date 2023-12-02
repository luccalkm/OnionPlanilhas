using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplicacao.Migrations
{
    /// <inheritdoc />
    public partial class ConfigurandoCamposTabelas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pedidos_ClienteId",
                table: "Pedidos");

            migrationBuilder.CreateIndex(
                name: "IX_Regiao_UF",
                table: "Regiao",
                column: "UF");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ClienteId_Data",
                table: "Pedidos",
                columns: new[] { "ClienteId", "Data" });

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_NumeroDocumento_CEP",
                table: "Clientes",
                columns: new[] { "NumeroDocumento", "CEP" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Regiao_UF",
                table: "Regiao");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_ClienteId_Data",
                table: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_NumeroDocumento_CEP",
                table: "Clientes");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ClienteId",
                table: "Pedidos",
                column: "ClienteId");
        }
    }
}
