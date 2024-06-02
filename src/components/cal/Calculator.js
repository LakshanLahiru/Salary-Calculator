import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { useNumberFormat } from '@react-input/number-format';
import Display from '../display/Display';
import { MyContext } from '../MyContext';


function Calculator() {
  const inputRef = useNumberFormat({ locales: 'en', maximumFractionDigits: 2 });
  const [basic, setBasic] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [allEarnings, setAllEarnings] = useState([]);
  const [allDeduction, setAllDeduction] = useState([]);
  const [dtitle, setDTitle] = useState('');
  const [damount, setDAmount] = useState(null);
 

//   useEffect(() => {
//     console.log('Updated allEarnings:', allEarnings);
//   }, [allEarnings]);

//   useEffect(() => {
//     console.log('Updated allDeductions:', allDeduction);
//   }, [allDeduction]);
useEffect(() => {
    const savedBasic = localStorage.getItem('basic');
    const savedEarnings = localStorage.getItem('allEarnings');
    const savedDeductions = localStorage.getItem('allDeduction');
    if (savedBasic) setBasic(savedBasic);
    if (savedEarnings) setAllEarnings(JSON.parse(savedEarnings));
    if (savedDeductions) setAllDeduction(JSON.parse(savedDeductions));
  }, []);
  
  useEffect(() => {
    localStorage.setItem('basic', basic);
  }, [basic]);
  
  useEffect(() => {
    localStorage.setItem('allEarnings', JSON.stringify(allEarnings));
  }, [allEarnings]);
  
  useEffect(() => {
    localStorage.setItem('allDeduction', JSON.stringify(allDeduction));
  }, [allDeduction]);
  

  

  const handleBasicChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    if (!isNaN(inputValue)) {
      setBasic(inputValue);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAdd = () => {
    setAllEarnings([...allEarnings, { title, amount: formatCurrency(amount) }]);
    setTitle('');
    setAmount('');
  };
//   deduction
  const handleAddDeduction=()=>{
    setAllDeduction([...allDeduction,{dtitle,damount:formatCurrency(damount)}]);
    setDTitle('');
    setDAmount('');
  };

  //Earning
  const handleEarningChange = (index, field, value) => {
    const newEarnings = [...allEarnings];
    if (field === 'amount') {
      const inputValue = value.replace(/,/g, '');
      if (!isNaN(inputValue)) {
        newEarnings[index][field] = formatCurrency(inputValue);
      }
    } else if (field === 'epf') {
      newEarnings[index][field] = value.target.checked;
    } else {
      newEarnings[index][field] = value;
    }
    setAllEarnings(newEarnings);
  };

  //deduction

  const handleDeduction = (index, field, value) => {
    const newDeduction = [...allDeduction];
    if (field === 'damount') {
      const inputValue = value.replace(/,/g, '');
      if (!isNaN(inputValue)) {
        newDeduction[index][field] = formatCurrency(inputValue);
      }
    
    }else {
        newDeduction[index][field] = value;
    }
    setAllDeduction(newDeduction);
  };

  //Earning
  const handleDelete = (index,event) => {
    event.preventDefault();
    const updatedEarnings = [...allEarnings];
    updatedEarnings.splice(index, 1);
    setAllEarnings(updatedEarnings);
    console.log(index)
  };

  //Deduction

  const handleDeleteDeduction = (index,event) => {
    event.preventDefault();
    const updatedDeduction = [...allDeduction];
    updatedDeduction.splice(index, 1);
    setAllDeduction(updatedDeduction);
    console.log(index)
  };

  

  return (
    <div className='box'>
    <div className='container'>
      <h4>Calculate Your Salary</h4>
      <form className='form'>
        <label className='body-large-semibold'>
          Basic Salary<br />
          <input
            type="text"
            value={formatCurrency(basic)}
            className='basic'
            onChange={handleBasicChange}
            ref={inputRef}
            required
          />
        </label><br /><br />
        <label className='body-large-semibold'>
          Earning<br />
          <div className='body-small'>
            Allowance, Fixed Allowance, Bonus and etc.
          </div>
        </label>
      </form>
      <div>
        {allEarnings.map((earning, index) => (
          <div key={index} className='earning-row'>
            <form className='form'>
              <input
                type='text'
                value={earning.title}
                onChange={(e) => handleEarningChange(index, 'title', e.target.value)}
                placeholder='Pay Details(Title)'
                className='title-input'
              />
              <input
                type='text'
                value={earning.amount}
                onChange={(e) => handleEarningChange(index, 'amount', e.target.value)}
                placeholder='Amount'
                className='amount-input'
              />
              <button className='delete' onClick={(e) => handleDelete(index,e)}>X</button>
              <input 
                type="checkbox" 
                className='check'
                checked={earning.epf}
                onChange={(e) => handleEarningChange(index, 'epf', e)}
              />
              
              <label> EPF/ETF</label>
            </form>
          </div>
        ))}
        <div className='add-earning'>
          <form className='form'>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Pay Details(Title)'
              className='title-input'
            />
            <input
              type='text'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Amount'
              className='amount-input'
            /><br></br>
            <button className='button-text' type='button' onClick={handleAdd}>
              + Add New Allowance
            </button>
            <div><hr/></div>
            <label className='body-large-semibold'>
                Deductions<br />
                <div className='body-small'>
                Salary Advances, Loan Deductions and all
                </div>
            </label>
          </form>
        </div>
      </div>
      
      {/* deduction */}
      <div>
        {allDeduction.map((deduction, index) => (
          <div key={index} className='earning-row'>
            <form className='form'>
              <input
                type='text'
                value={deduction.dtitle}
                onChange={(e) => handleDeduction(index, 'dtitle', e.target.value)}
                placeholder='Pay Details(Title)'
                className='title-input'
              />
              <input
                type='text'
                value={deduction.damount}
                onChange={(e) => handleDeduction(index, 'damount', e.target.value)}
                placeholder='Amount'
                className='amount-input'
              />
              <button className='delete' onClick={(e) => handleDeleteDeduction(index,e)}>X</button>

            </form>
          </div>
        ))}
        <div className='add-earning'>
          <form className='form'>
            <input
              type='text'
              value={dtitle}
              onChange={(e) => setDTitle(e.target.value)}
              placeholder='Pay Details(Title)'
              className='title-input'
            />
            <input
              type='text'
              value={damount}
              onChange={(e) => setDAmount(e.target.value)}
              placeholder='Amount'
              className='amount-input'
            /><br></br>
            <button className='button-text' type='button' onClick={handleAddDeduction}>
              + Add New Deduction
            </button>
            <div><hr/></div>

          </form>
        </div>
      </div>
      {/* <Display/> */}
    </div> 
    <div className='container3'>
        
       
      <MyContext.Provider value={{ basic, allEarnings,allDeduction }}>
        <Display/>
      </MyContext.Provider>
   
    </div>

    </div>
  );
}

export default Calculator;
