"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const listeningResponse = await app.listen(process.env.PORT || 4000);
    console.log('🚀 ~ file: main.ts ~ line 7 ~ bootstrap ~ listeningResponse', listeningResponse);
}
bootstrap();
//# sourceMappingURL=main.js.map