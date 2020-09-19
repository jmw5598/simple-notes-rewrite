import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud.service';
import { Topic, ExportConfig, FileResponse } from '@sn/shared/models';
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class TopicsService extends AbstractCrudService<Topic, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/topics`);
  }

  public exportTopic(topicId: number, config: ExportConfig): Observable<FileResponse> {
    return this._http.post(`${environment.api.baseUrl}/topics/${topicId}/download`, config, { observe: 'response', responseType: 'blob', })
      .pipe(map(response => this._extractFile(response)));
  }

  private _extractFile(res: Response | any) {
    const header = res.headers.get('Content-Disposition');
    const filename = header.substring(header.indexOf('filename'), header.length).split("=")[1];
    return new FileResponse(res.body, filename);
  }
}
