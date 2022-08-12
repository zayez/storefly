{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    buildInputs = [
      pkgs.nodejs
      pkgs.fish
      pkgs.sqlite
      pkgs.entr
    ];
}