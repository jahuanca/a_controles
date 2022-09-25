import * as jwt_decode from "jwt-decode";
export class Variables {
    
    public static URL_SERVER="http://localhost:3002/";

    constructor() {

    }

    public static get(promise:Promise<any[]>) {
        return promise.then(data => {
           return [null, data];
        })
        .catch(err => [err]);
    }
    
    public tipo:Number=0;
    
    public isAdmin():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='4' || 
        Variables.getDecodedAccessToken().sub[1]=='5');
    }

    public isSuperAdmin():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]==5);
    }

    public isComercio():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='3' || 
        Variables.getDecodedAccessToken().sub[1]=='4' || 
        Variables.getDecodedAccessToken().sub[1]=='5');
    }

    public isDelivery():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='2' || 
        Variables.getDecodedAccessToken().sub[1]=='4' || 
        Variables.getDecodedAccessToken().sub[1]=='5');
    }

    public isOnlyDelivery():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='2');
    }

    public isOnlyComercio():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='3');
    }

    public isCliente():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='1');
    }

    public hasAdmin():Boolean{
        return (Variables.getDecodedAccessToken().sub[1]=='2' || 
        Variables.getDecodedAccessToken().sub[1]=='3' ||
        Variables.getDecodedAccessToken().sub[1]=='4' || 
        Variables.getDecodedAccessToken().sub[1]=='5');
    }

    public static getDecodedAccessToken(): any {
            try{
                let u=localStorage.getItem('tokenSumate2020');
                if(u==null || u===undefined){
                    return null;
                }
                return jwt_decode(u);
            }
            catch(error){
                return null;
            }
    }

    public static append(obj:Object, selected:any):void{
        const k=Object.keys(obj);
        for (let i = 0; i < k.length; i++) {
            selected[k[i]]=obj[k[i]];
        }   
    }


    public static checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
        const img = new Image(); // create image
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(height>=300 && width >= 300);
        };
    });
    }
}
