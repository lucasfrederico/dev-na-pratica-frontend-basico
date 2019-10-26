import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public marcas: any = [];

  constructor(
    private http: HttpClient
  ) {
    this.main();
  }

  async main() {
    this.marcas = await this.http.get('http://fipeapi.appspot.com').toPromise();

    const audi = this.marcas.filter((mar: any) => mar.nome === 'Audi')[0];

    console.log(audi);
  }


}
