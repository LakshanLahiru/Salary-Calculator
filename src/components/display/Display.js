import React from 'react'
import './Display.css'
import { useContext } from 'react';
import { MyContext } from '../MyContext'

function Display() {
    const { basic,allEarnings,allDeduction } = useContext(MyContext);
    console.log(basic)
    console.log(allEarnings)
    const totalAmount = allEarnings.reduce((acc, item) => acc + parseFloat(item.amount.replace(/,/g, '')), 0);
    const totalValue = parseFloat(basic.replace(/,/g, '')) + totalAmount;

    const totalDeduction = allDeduction.reduce((dd,item)=>dd+parseFloat(item.damount.replace(/,/g, '')), 0)
    const gorssEarning = totalValue-totalDeduction;

    const totalAmountForEPF = allEarnings.reduce((acc, item) => {
        if (item.epf) {
          return acc + parseFloat(item.amount.replace(/,/g, ''));
        }
        return acc;
      }, 0);
    const totalEarningForEpf = parseFloat(basic.replace(/,/g, ''))+totalAmountForEPF;
    const grossSalaryForEPF  = totalEarningForEpf-totalDeduction;
    const EmployeeEPF = grossSalaryForEPF*0.08;
    const EmployeeEPF12 = grossSalaryForEPF*0.12;
    const EmployeeETF3 = grossSalaryForEPF*0.03;
    const APIT = (gorssEarning*0.18)-25500;
    const netCost = gorssEarning-APIT-EmployeeEPF;
    const ctc = gorssEarning+EmployeeEPF12+EmployeeETF3;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      };
  return (
    <div className='container2'>
        <h4>Your Salary</h4>
        <div className='box1'>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-default-semibold'>Item</div>
                </div>
                <div className='column right-align'>
                <div className='name-default-semibold'>Amount</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Basic Salary</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{formatCurrency(basic)}</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Gross Earning</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{formatCurrency(gorssEarning)}</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Gross Deduction</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{"- "+formatCurrency(totalDeduction)}</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Employee   EPF(8%)</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{"- "+formatCurrency(EmployeeEPF)}</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>APIT</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{"- "+formatCurrency(APIT)}</div>
                </div>
            </div>
        </div>
        <div className='box2'>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'style={{ fontWeight: 600 }}>Net Salary (Take Home)</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large' style={{ fontWeight: 600 }}>{formatCurrency(netCost)}</div>

            </div>
        </div>
           
        </div>
        <div className='box3'>
            <p className='name-default-semibold'>Contribution from the Employer</p>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Employeer EPF(12%)</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{formatCurrency(EmployeeEPF12)}</div>
                </div>
            </div>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>Employeer ETF(3%)</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{formatCurrency(EmployeeETF3)}</div>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className='column left-align'>
                <div className='name-body-large'>CTC (Costof Company)</div>
                </div>
                <div className='column right-align'>
                <div className='name-body-large'>{formatCurrency(ctc)}</div>
                </div>
            </div>
        </div>

    </div>


    
  )
}

export default Display