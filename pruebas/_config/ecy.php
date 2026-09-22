<?php 

    /**
    * encryptador
    */
    class _cy
    {
        
        var $key;
        var $iv_size;

        function __construct()
        {
            $this->key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
            $this->cipher = "aes-128-gcm";
            //$this->iv = openssl_cipher_iv_length($this->cipher);//openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher));
            $this->tag = 'Logintech';
            //$this->iv_size =mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        }

        function ency($txt)
        {
            // $key_size =  strlen($this->key);
            
            $plaintext = $txt;

            $ciphertext = openssl_encrypt($plaintext, $this->cipher, $this->key, $options=0,  $this->iv,$this->tag);//mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $this->key,
                          //               $txt, MCRYPT_MODE_CBC, $iv);
            $ciphertext_base64 = base64_encode($ciphertext);

            return $ciphertext_base64;
        }

        function decy($txt)
        {
            $ciphertext_dec = base64_decode($txt);
            // $iv_dec = substr($ciphertext_dec, 0, $this->iv_size);
    
            // $ciphertext_dec = substr($ciphertext_dec, $this->iv_size);

            // $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $this->key,
            //                         $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
            // return $plaintext_dec;
            return openssl_decrypt($ciphertext_dec,$this->cipher, $this->key, $options=0, $this->iv,$this->tag);
        }

    }


 ?>