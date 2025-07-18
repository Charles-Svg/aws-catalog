import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Archi } from "@/lib/types"

type Archis = {
  architectures : Archi[]
}

export default function ArchiTable({architectures}: Archis){

    return(
    <div className="w-full overflow-x-auto">
        <Table className="mx-4 min-w-[600px]">
            <TableHeader>
                <TableRow>
                    <TableHead className="lg:w-1/3 w-1/2 min-w-[300px] p4"></TableHead>
                    <TableHead className="w-1/3 p4">Description</TableHead>
                    <TableHead className="p4">Last update</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {architectures.map((archi,i)=> (
                    <TableRow key ={i} className="align-top min-h-[10rem]">
                        <TableCell className="p-4">
                            <img src={`img/${archi.image}`} alt={archi.title} className="w-full h-auto object-contain"/>
                        </TableCell>
                        <TableCell className="whitespace-normal break-words max-w-xs p4" >
                            {archi.description}
                        </TableCell>
                        <TableCell className="p-4">
                            {archi.lastUpdate}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    )
}