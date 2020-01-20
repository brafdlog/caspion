// copied from https://github.com/getstation/electron-google-oauth2/blob/7082c80b8f98bad26a7cd61c671cf58b99834381/src/LoopbackRedirectServer.ts
import * as http from 'http';
import * as url from 'url';

export type LoopbackRedirectServerOptions = {
  /**
   * The port the loopback will be listening on.
   */
  port: number,
  /**
   * The `path` on which we expect the code to be present
   * as query string.
   */
  callbackPath: string,
  /**
   * The URL to which the `callbackPath` will be redirecting to in case of sucess.
   */
  successRedirectURL: string,
};

export default class LoopbackRedirectServer {
  private _server: http.Server;
  private _maybeRedirection: Promise<string>;

  constructor({ port, successRedirectURL, callbackPath }: LoopbackRedirectServerOptions) {
    this._maybeRedirection = new Promise((resolve, reject) => {
      this._server = http.createServer((req, res) => {
        if (req.url && url.parse(req.url).pathname === callbackPath) {
          res.writeHead(302, {
            Location: successRedirectURL,
          });
          res.end();

          resolve(url.resolve(`http://127.0.0.1:${port}`, req.url));

          this._server.close();
        } else {
          res.writeHead(404);
          res.end();
        }
      });
      this._server.on('error', e => reject(e));
      this._server.listen(port);
    });
  }

  /**
   * Will resolve with the exact reached callback URL that contains the Authorization code.
   */
  waitForRedirection() {
    return this._maybeRedirection;
  }

  close() {
    return new Promise(resolve => this._server.close(resolve));
  }
}