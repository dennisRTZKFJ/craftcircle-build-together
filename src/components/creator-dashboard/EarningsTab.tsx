
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, DollarSign } from 'lucide-react';

interface MonthlyEarning {
  month: string;
  amount: number;
}

interface EarningsTabProps {
  monthlyEarnings: MonthlyEarning[];
}

const EarningsTab = ({ monthlyEarnings }: EarningsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Einnahmenübersicht</CardTitle>
          <CardDescription>Deine Einnahmen aus Tutorials und Affiliate-Links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
            <div className="text-center p-4">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
              <p className="text-muted-foreground">
                Hier wird die Entwicklung deiner Einnahmen angezeigt
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monatliche Einnahmen</CardTitle>
            <CardDescription>Übersicht deiner Einnahmen nach Monat</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Monat</TableHead>
                  <TableHead>Tutorial-Verkäufe</TableHead>
                  <TableHead>Affiliate-Provisionen</TableHead>
                  <TableHead>Premium-Anteil</TableHead>
                  <TableHead className="text-right">Gesamt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyEarnings.map((month) => (
                  <TableRow key={month.month}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell>
                      €{(month.amount * 0.6).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      €{(month.amount * 0.25).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      €{(month.amount * 0.15).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      €{month.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">Gesamt</TableCell>
                <TableCell className="font-bold">
                  €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.6, 0).toFixed(2)}
                </TableCell>
                <TableCell className="font-bold">
                  €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.25, 0).toFixed(2)}
                </TableCell>
                <TableCell className="font-bold">
                  €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.15, 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  €{monthlyEarnings.reduce((sum, m) => sum + m.amount, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </Table>
          </CardContent>
          <CardFooter className="border-t">
            <div className="flex justify-between w-full items-center">
              <Button variant="outline" size="sm">
                Einnahmen exportieren
              </Button>
              <div className="text-sm text-muted-foreground">
                Nächste Auszahlung: 01.06.2025
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Einnahmenquellen</CardTitle>
            <CardDescription>Aufschlüsselung nach Quelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Tutorial-Verkäufe</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Affiliate-Provisionen</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Premium-Mitgliedschaften</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              
              <div className="bg-muted/40 rounded-lg p-4 mt-6">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-craft-wood" />
                  Tipp zur Optimierung
                </h4>
                <p className="text-sm mt-2 text-muted-foreground">
                  Deine Affiliate-Einnahmen könnten durch mehr gezielte Materialempfehlungen in deinen Tutorials gesteigert werden.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Mehr erfahren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsTab;
