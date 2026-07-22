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
  alert("Em breve vamos chamar a api python!")

  const resposta = await fetch("http://localhost:5000/certificado",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(dados)
  });

  if (resposta.ok) {
    const arquivo = await resposta.blob()

      const url = window.URL.createObjectURL(arquivo)

      const link = document.createElement("a")
      link.href = url

      link.download = "certificado.pdf"

      link.click()
  }
}

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
         <h1 className="text-3xl text-black font-bold text-center mb-6">Sistema de Certificados</h1>

         <div className="mb-6">
             <label className="block mb-2 text-black">Nome</label>

             <input className="w-full border rounded-lg p-2 text-black"
             value={dados.nome}
             onChange={(e)=> setDados({...dados, nome: e.target.value})}
             />
         </div>

         <div className="mb-6">
             <label className="block mb-2 text-black">Curso</label>

             <input className="w-full border rounded-lg p-2 text-black"
             value={dados.curso}
             onChange={(e)=> setDados({...dados, curso: e.target.value})}
             />
         </div>

         <div className="mb-6">
             <label className="block mb-2 text-black">Carga Horaria</label>

             <input className="w-full border rounded-lg p-2 text-black"
             value={dados.cargaHoraria}
             onChange={(e)=> setDados({...dados, cargaHoraria: e.target.value})}
             />
         </div>

         <button onClick={gerarCertificado}
         className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700">
            Gerar Certificado
         </button>
      </div>
    </main>
  );
}