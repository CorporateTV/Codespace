package org.example;

import java.util.Scanner;

public class MetodosAuntenticacao {
    Scanner input = new Scanner(System.in);
    Scanner inputNext = new Scanner(System.in);
    void menuLogin() {
        String usuario;
        String senha;
        String confirmarSenha;

        System.out.println("Insira o seu usuário: ");
        usuario = input.nextLine();

        System.out.println("Insira o seu senha: ");
        senha = inputNext.nextLine();

        System.out.println("Confirmar senha: ");
        confirmarSenha = inputNext.nextLine();

        resultadoAutenticacao(verificarConfirmarSenha(senha, confirmarSenha),
                verificarCamposVazio(usuario, senha, confirmarSenha), validarTamanhoSenha(senha), usuario);
    }
    Boolean verificarCamposVazio(String usuario, String senha, String confirmarSenha) {
        return usuario.isEmpty() || senha.isEmpty() || confirmarSenha.isEmpty();
    }
    Boolean validarTamanhoSenha(String senha) {
        Boolean senhaValida = true;
        if(senha.length() > 6) {
            senhaValida = false;
        }
        return senhaValida;
    }
    Boolean verificarConfirmarSenha(String senha, String confirmarSenha) {
        return confirmarSenha.equals(senha);
    }
    void resultadoAutenticacao(Boolean validacaoConfirmarSenha, Boolean validacaoCampoVazio, Boolean validcaoSenha, String nomeUsuario) {
        if(validacaoCampoVazio) {
            System.out.println("Todos os campos devem estar preenchidos");
        } else if(validcaoSenha) {
            System.out.println("Senha deve possuir mais do que 6 caracteres");
        } else if(!validacaoConfirmarSenha) {
            System.out.println("Senhas não se conferem");
        } else {
            System.out.println("Bem-vindo ao sistema LiSync! \n%s".formatted(nomeUsuario));
        }
    }
}
