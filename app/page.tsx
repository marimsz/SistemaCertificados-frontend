'use client'
import { useState } from "react";

interface Certificado {
  nome:string,
  curso:string,
  cargaHoraria:string
}

export default function Home() {

  const [dados, setDados] = useState<Certificado>({
    nome: "",
    curso: "",
    cargaHoraria: "",
  });

 async function gerarCertificado() {
  console.log(dados)

  const resposta = await fetch("https://sistemacertificados-k3p4.onrender.com/",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(dados)
  });

 if (!resposta.ok) {
      const erro = await resposta.text();
      console.error("Erro da API:", erro);
      alert("Erro ao gerar o certificado.");
      return;
    }

    const arquivo = await resposta.blob()

      const url = window.URL.createObjectURL(arquivo)

      const link = document.createElement("a")
      link.href = url

      link.download = "certificado.pdf"

      link.click()
  
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-100 to-blue-400 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

           {/* Cabeçalho */}
           <div className="text-center mb-8">

           <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4">
             <span className="text-white text-2xl">✓</span>
           </div>

            <h1 className="text-3xl font-bold text-slate-800">
                Sistema de Certificados
            </h1>

          <p className="text-slate-500 mt-2">
            Gere seu certificado de forma rápida e simples.
          </p>

        </div>

        {/* Formulário */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7">

          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Dados do certificado
          </h2>

            <div className="mb-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">
              Nome
             </label>

             <input 
              type="text"
              placeholder="Digite seu nome"
              value={dados.nome}
              onChange={(e)=>
                 setDados({
                  ...dados,
                  nome: e.target.value
                })
              }
               className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
             />

            <div className="mb-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">
              Curso
             </label>

             <input 
             type="text"
             placeholder="Digite o nome do curso"
             value={dados.curso}
             onChange={(e)=> setDados({
              ...dados,
              curso: e.target.value
             })
            }
             className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
             />

              <div className="mb-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">
              Carga Horaria
              </label>

             <input 
             type="text"
             placeholder="Digite a carga horária"
             onChange={(e)=> setDados({
              ...dados,
               cargaHoraria: e.target.value
              })
            }
             className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
             />
            </div>
            </div>
            </div>

         <button onClick={gerarCertificado}
         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Gerar Certificado
         </button>

          <p className="text-center text-sm text-slate-400 mt-6">
          Preencha todos os campos para gerar seu certificado.
          </p>
        </div>
      </div>
    </main>
  );
}