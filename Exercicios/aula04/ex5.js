/* GABARITO 5 */
class Veiculo {
    constructor(mo, ma, an) {
        this.modelo = mo;
        this.marca = ma;
        this.ano = an;
    }
    idadeVeiculo(anoAtual) {
        return anoAtual - this.ano;
    }
}
const meuCarro = new Veiculo("Corolla", "Toyota", 2020);
let anoHj = prompt("Em que ano estamos?");
alert("O " + meuCarro.modelo + " tem " + meuCarro.idadeVeiculo(anoHj) + " anos.");