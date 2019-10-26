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

  /*rxjs() {
    this.http.get(`http://fipeapi.appspot.com/api/1/carros/marcas.json`)
      .pipe(
        map((marca: any) => marca.filter((mar: any) => mar.name === 'VOLKSWAGEN')[0]),
        switchMap((volk: any) => {
          this.volkswagenId = volk.id;
          return this.http.get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${volk.id}.json`);
        }),
        map((vei: any) => vei.filter((v: any) => v.name === 'AMAROK Trendline CD 2.0 TDI 4X4 Dies Aut')[0]),
        switchMap((amarok: any) => {
          return this.http.get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.volkswagenId}/${amarok.id}/2018-3.json`);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe((data: any) => this.carro = data);
  }*/





}
