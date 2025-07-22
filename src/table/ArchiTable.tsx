import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useNavigate } from "react-router-dom";

import type { Archi } from "@/lib/types"

import"./ArchiTable.css"

type Archis = {
  architectures : Archi[]
}

export default function ArchiTable({architectures}: Archis){
  const navigate = useNavigate();
    return(
    <>
        <h1 className="mt-8 mb-6 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">List of all Architectures</h1>
            <Table className="mx-4 min-w-[600px] hidden md:table">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2 p-4">Architecture</TableHead>
                        <TableHead className="w-1/3 p-4">Description</TableHead>
                        <TableHead className="w-1/6 p-4">Last update</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {architectures.map((archi,i)=> (
                        <TableRow key ={i} className="align-middle min-h-[6rem]" onClick={()=> navigate(`/catalog/${archi.id}`)}>
                            <TableCell className="p-4" >
                                <img src={`img/${archi.image}`} alt={archi.title} className="w-full h-auto object-contain p-2"/>
                            </TableCell>
                            <TableCell className="p-4" >
                                <p className="whitespace-normal break-words line-clamp-8 lg:line-clamp-none text-left">{archi.description}</p>
                            </TableCell>
                            <TableCell className="p-4 text-center align-middle">
                                {archi.lastUpdate}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

              {/* Cartes empilées visibles uniquement en mobile */}
        <div className="flex flex-col gap-6 md:hidden px-4">
            {architectures.map((archi, i) => (
            <div
                key={i}
                className="border rounded-lg shadow-sm p-4 flex flex-col"
                style={{ minHeight: '15rem' }}
                onClick={()=> navigate(`/catalog/${archi.id}`)}
            >
                <img
                src={`img/${archi.image}`}
                alt={archi.title}
                className="w-full h-40 object-contain mb-4"
                />
                <h3 className="font-semibold mb-2">{archi.title}</h3>
                <p className="text-left line-clamp-3 mb-4">{archi.description}</p>
                <div className="mt-auto text-sm text-gray-600 text-right">
                Dernière mise à jour : {archi.lastUpdate}
                </div>
            </div>
            ))}
        </div>
    </>
    )
}