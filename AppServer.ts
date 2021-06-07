import {App} from './App';

let server: any = new App().expressApp;
server.listen(process.env.PORT || 4000);
console.log("Server running on port: 4000 or Azure port");