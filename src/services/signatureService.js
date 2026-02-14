import toast from "react-hot-toast";

class SignatureService {
    constructor() {
        this.scriptsLoaded = false;
        this.isLoading = false;
    }

    async loadScripts() {
        if (this.scriptsLoaded) return;
        if (this.isLoading) return;

        this.isLoading = true;
        
        try {
             // Try load autoscript.js and miniapplet.js from window if they are globally available
             // For now we assume they are added to index.html manually by the user or 
             // we can try to dynamically inject them if we had a CDN source, but AutoFirma doesn't have a reliable public CDN.
             // We will check if `AutoScript` is defined.
             if (typeof window.AutoScript === 'undefined') {
                 // Creating a dummy AutoScript object for development if not present, or throwing error.
                 // For now, throw error explaining it needs to be installed.
                 console.warn("AutoScript library not found. Ensure autoscript.js is loaded.");
                 throw new Error("La librería de AutoFirma (autoscript.js) no está cargada en la aplicación.");
             }
             this.scriptsLoaded = true;
        } catch (error) {
             console.error("Failed to load AutoFirma scripts:", error);
             throw error;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Signs a base64 document using AutoFirma.
     * @param {string} base64Data - The document content in Base64
     * @returns {Promise<string>} - The signed base64 data
     */
    async signDocument(base64Data) {
        await this.loadScripts();

        return new Promise((resolve, reject) => {
            try {
                // Configure AutoFirma (standard parameters for PDF signing)
                const config = {
                    format: "PAdES",
                    extraParams: "b64Encoded=true" // Input is base64
                };

                const successCallback = (signatureB64) => {
                    resolve(signatureB64);
                };

                const errorCallback = (errorType, errorMessage) => {
                    reject(new Error(`Error en la firma: ${errorMessage} (${errorType})`));
                };

                // Invoke AutoScript.sign
                // signature: sign(source, format, params, successCallback, errorCallback)
                window.AutoScript.sign(
                    base64Data, 
                    "PAdES", 
                    "extraParams=mode=explicit", // Sometimes needed
                    successCallback, 
                    errorCallback
                ); 

            } catch (e) {
                reject(e);
            }
        });
    }

    // Temporary helper until scripts are available
    async mockSign(base64Data) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(base64Data); // Return original as signed for testing
            }, 2000);
        });
    }
}

export const signatureService = new SignatureService();
