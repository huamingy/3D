/* ========================================================================
 * Copyright (c) 2005-2015 The OPC Foundation, Inc. All rights reserved.
 *
 * OPC Foundation MIT License 1.00
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * The complete license agreement can be found here:
 * http://opcfoundation.org/License/MIT/1.00/
 * ======================================================================*/
package com.ruoyi.project.datasource.opc;

import org.opcfoundation.ua.common.ServiceResultException;
import org.opcfoundation.ua.transport.security.Cert;
import org.opcfoundation.ua.transport.security.KeyPair;
import org.opcfoundation.ua.transport.security.PrivKey;
import org.opcfoundation.ua.utils.CertificateUtils;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.File;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.InvalidParameterSpecException;

/**
 * Keystore password is "password".
 * Private key passwords are "password".
 */
public class ExampleKeys {

    private static final String PRIVKEY_PASSWORD = "Opc.Ua";

    /**
     * Load file certificate and private key from applicationName.der & .pfx - or create ones if they do not exist
     *
     * @return the KeyPair composed of the certificate and private key
     * @throws ServiceResultException
     */
    public static KeyPair getCert(String applicationName, String hostName, String applicationUri) throws ServiceResultException {
        File certFile = new File(applicationName + ".der");
        File privKeyFile = new File(applicationName + ".pem");
        try {
            Cert myCertificate = Cert.load(certFile);
            PrivKey myPrivateKey = PrivKey.load(privKeyFile, PRIVKEY_PASSWORD);
            return new KeyPair(myCertificate, myPrivateKey);
        } catch (CertificateException | NoSuchAlgorithmException | InvalidKeyException | InvalidKeySpecException | NoSuchPaddingException | InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException | InvalidParameterSpecException e) {
            throw new ServiceResultException(e);
        } catch (IOException e) {
            try {
                KeyPair keys = CertificateUtils.createApplicationInstanceCertificate(applicationName, null, applicationUri, 3650, hostName);
                keys.getCertificate().save(certFile);
                keys.getPrivateKey().save(privKeyFile);
                return keys;
            } catch (Exception e1) {
                throw new ServiceResultException(e1);
            }
        }
    }
}
