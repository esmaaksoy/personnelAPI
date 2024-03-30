"use strict"

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

/* ------------------------------------------------------- *
const options = {
	openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
	language:         <string>,     // Change response language.                      By default is 'en-US'
	disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
	autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
	autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
	autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
	writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', language: 'tr-tr' })
const swaggerAutogen = require('swagger-autogen')()  //! çağırırken aynı zamanda çalıştırdık, çalıştırırken bazı ayarlar yapabiliriz. Yukarıdakiler bu ayarlar. Çok da gerekli değil
const packageJson = require('./package.json')

const document = {
	//! uygulamam ile ilgili bilgiler yazabiliyoruz. Bunları manuel yazmak yerine package.json'dan da çekebiliriz. Yukarıda packageJson import ettik. böylece packagejson da bir değişiklik olursa bunu tekrar manule değiştirmeme gerek yok.
	// info: {
	// 	version: "1.0.0",
	// 	title: "Personnel API",
	// 	description: "Personnel Management API Service",
	// 	termsOfService: "http://www.clarusway.com",
	// 	contact: { name: "Clarusway", email: "qadir@clarusway.com" },
	// 	license: { name: "BSD License", },
	// },
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "http://www.clarusway.com",
		contact: { name: packageJson.author, email: "qadir@clarusway.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	// SimpleToken Settings:
	securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
	},
	security: [{ Token: [] }], //!Yukarıda securityDefinitions da tanımladığım yeri kullanıyorum
	definitions: {
		"/auth/login": {
			username: {
				type: "String",
				required: true
			},
			password: {
				type: "String",
				required: true
			},
		},
		"/auth/refresh": {
			"token.refresh": {
				description: "{ token: { refresh: ... } }",
				type: "String",
				required: true
			}
		},
		// "Department": {
		// 	"name": {
		// 		type: "ObjectId",
		// 		required: true
		// 	}
		// },
		"Department": require('./src/models/department.model').schema.obj,
		"Personnel": require('./src/models/personnel.model').schema.obj,
	}
};

const routes = ['./index.js']  //! routeları taramaya index.js den başla
const outputFile = './swagger.json'  //!yazacağın dosya da ana dizinde ve ismi "swagger.json"

// Create JSON file:
swaggerAutogen(outputFile, routes, document)  //! swaggerAutogen çalıştırıyoruz. bu dosyaya bu routeları şu ayarlara göre yaz