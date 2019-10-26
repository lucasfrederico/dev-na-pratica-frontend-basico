import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  private marcas: any = [];
  private veiculosDaVolkswagen: any = [];
  private detalhesPorAnoDesejado: any;
  public valorDoVeiculo: string;
  public blocked = false;

  constructor(
    private http: HttpClient
  ) {
    this.main();
  }

  async main() {
    this.blocked = true;
    this.marcas = await this.http
      .get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
      .toPromise();

    const volkswagenDetalhes = this.marcas
      .filter((mar: any) => mar.name === 'VOLKSWAGEN')[0];

    this.veiculosDaVolkswagen = await this.http
      .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${volkswagenDetalhes.id}.json`)
      .toPromise();

    const veiculoDesejado = this.veiculosDaVolkswagen
      .filter((vei: any) => vei.name === 'AMAROK Trendline CD 2.0 TDI 4X4 Dies Aut')[0];

    this.detalhesPorAnoDesejado = await this.http
      .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${volkswagenDetalhes.id}/${veiculoDesejado.id}/2018-1.json`)
      .toPromise();

    this.valorDoVeiculo = this.detalhesPorAnoDesejado.preco;
    this.blocked = false;
  }


}
