export class Noticias {
    constructor(
    public id: any,
    public titulo: string,
    public hora: string,
    public autor: string,
    public resumen: string,
    public contenido: string, 
    public imagen: string,
    public imgmini: string,
    public visitas: any){ }
}

export class Imagen{
    constructor(public id: any, public post_id: any, public ruta: string, public nombre: string){}
}