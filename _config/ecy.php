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
            $this->iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        }

        function ency($txt)
        {
            $key_size =  strlen($this->key);
            
            $plaintext = $txt;
            $iv = mcrypt_create_iv($this->iv_size, MCRYPT_RAND);

            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $this->key,
                                         $txt, MCRYPT_MODE_CBC, $iv);

            $ciphertext = $iv . $ciphertext;
            $ciphertext_base64 = base64_encode($ciphertext);

            return $ciphertext_base64;
        }

        function decy($txt)
        {
            $ciphertext_dec = base64_decode($txt);
            $iv_dec = substr($ciphertext_dec, 0, $this->iv_size);
    
            $ciphertext_dec = substr($ciphertext_dec, $this->iv_size);

            $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $this->key,
                                    $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
            return $plaintext_dec;
        }

    }


 ?>