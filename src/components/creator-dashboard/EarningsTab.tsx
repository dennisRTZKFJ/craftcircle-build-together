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
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Your earnings from tutorials and affiliate links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex-center-h-300-bg-muted-rounded">
            <div className="text-center p-4">
              <DollarSign className="h-12 w-12 mx-auto mb-4 muted-text" />
              <p className="muted-text">
                Your earnings development will be shown here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid-cols-1-md-3-gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>Overview of your earnings by month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Tutorial Sales</TableHead>
                  <TableHead>Affiliate Commissions</TableHead>
                  <TableHead>Premium Share</TableHead>
                  <TableHead className="text-right">Total</TableHead>
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
                <TableCell className="font-bold">Total</TableCell>
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
            <div className="flex-between-full-items-center">
              <Button variant="outline" size="sm">
                Export Earnings
              </Button>
              <div className="small-muted-text">
                Next payout: 06/01/2025
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Breakdown by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex-between-text-sm-mb-1">
                  <span>Tutorial Sales</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex-between-text-sm-mb-1">
                  <span>Affiliate Commissions</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex-between-text-sm-mb-1">
                  <span>Premium Memberships</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              
              <div className="card-tip">
                <h4 className="font-medium flex-align-center-gap-2">
                  <AlertCircle className="h-4 w-4 icon-margin-right text-craft-wood" />
                  Optimization Tip
                </h4>
                <p className="small-muted-text mt-2">
                  Your affiliate earnings could be increased through more targeted material recommendations in your tutorials.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Learn more
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
