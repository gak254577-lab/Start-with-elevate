import React, { useState, useEffect } from 'react';
import { useTrainer } from '../context/TrainerContext';
import { X, Calculator, ArrowRight } from 'lucide-react';

export const BMICalculatorModal: React.FC = () => {
  const { isBMICalculatorOpen, closeBMICalculator, openTrialModal, profile, currentThemeConfig } = useTrainer();

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'very'>('moderate');

  // Reset all numeric fields to empty whenever the modal opens
  useEffect(() => {
    if (isBMICalculatorOpen) {
      setUnit('metric');
      setGender('male');
      setAge('');
      setWeightKg('');
      setHeightCm('');
      setWeightLbs('');
      setHeightFt('');
      setHeightIn('');
      setActivity('moderate');
    }
  }, [isBMICalculatorOpen]);

  // Synchronize unit switches smoothly without forcing preset numbers
  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === unit) return;
    if (newUnit === 'imperial') {
      const kgVal = parseFloat(weightKg);
      const cmVal = parseFloat(heightCm);
      if (!isNaN(kgVal) && kgVal > 0) {
        setWeightLbs(String(Math.round(kgVal * 2.20462)));
      } else {
        setWeightLbs('');
      }
      if (!isNaN(cmVal) && cmVal > 0) {
        const totalInches = Math.round(cmVal / 2.54);
        const ft = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        setHeightFt(String(ft));
        setHeightIn(String(inches));
      } else {
        setHeightFt('');
        setHeightIn('');
      }
    } else {
      const lbsVal = parseFloat(weightLbs);
      const ftVal = parseFloat(heightFt);
      const inVal = parseFloat(heightIn);
      if (!isNaN(lbsVal) && lbsVal > 0) {
        setWeightKg(String(Math.round(lbsVal * 0.453592)));
      } else {
        setWeightKg('');
      }
      if ((!isNaN(ftVal) && ftVal > 0) || (!isNaN(inVal) && inVal > 0)) {
        const totalInches = (isNaN(ftVal) ? 0 : ftVal) * 12 + (isNaN(inVal) ? 0 : inVal);
        setHeightCm(String(Math.round(totalInches * 2.54)));
      } else {
        setHeightCm('');
      }
    }
    setUnit(newUnit);
  };

  if (!isBMICalculatorOpen) return null;

  // Conversions and numerical parsing
  const ageNum = parseInt(age, 10) || 0;
  const weightKgNum = parseFloat(weightKg) || 0;
  const heightCmNum = parseFloat(heightCm) || 0;
  const weightLbsNum = parseFloat(weightLbs) || 0;
  const heightFtNum = parseFloat(heightFt) || 0;
  const heightInNum = parseFloat(heightIn) || 0;

  const actualWeightKg = unit === 'metric' ? weightKgNum : weightLbsNum * 0.453592;
  const actualHeightM = unit === 'metric' ? heightCmNum / 100 : (heightFtNum * 12 + heightInNum) * 0.0254;

  const hasValidInputs = actualWeightKg > 0 && actualHeightM > 0;
  const bmi = hasValidInputs 
    ? Number((actualWeightKg / (actualHeightM * actualHeightM)).toFixed(1)) 
    : 0;

  // BMR via Mifflin-St Jeor Equation
  const effectiveAge = Math.max(1, ageNum);
  let bmr = hasValidInputs && ageNum > 0
    ? 10 * actualWeightKg + 6.25 * (actualHeightM * 100) - 5 * effectiveAge
    : 0;

  if (bmr > 0) {
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.max(0, bmr);
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
  };

  const maintenanceCalories = bmr > 0 ? Math.round(bmr * activityMultipliers[activity]) : 0;
  const fatLossCalories = maintenanceCalories > 0 ? Math.round(maintenanceCalories * 0.8) : 0;
  const muscleGainCalories = maintenanceCalories > 0 ? Math.round(maintenanceCalories * 1.15) : 0;

  const getBMICategory = (val: number) => {
    if (val <= 0) return { label: 'Awaiting Details', color: 'text-stone-400', desc: 'Enter your age, weight, and height above to calculate your BMI and daily caloric roadmap.' };
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-400', desc: 'Focus on muscle mass & structured surplus nutrition.' };
    if (val < 25) return { label: 'Normal / Healthy Range', color: 'text-emerald-400', desc: 'Ideal baseline! Focus on body recomposition & progressive strength.' };
    if (val < 30) return { label: 'Overweight Range', color: currentThemeConfig.textClass, desc: 'Targeted caloric deficit + resistance training recommended.' };
    return { label: 'Obese Range', color: 'text-red-400', desc: 'Structured coaching for sustainable fat loss & joint protection.' };
  };

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-8 text-left animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden"></div>

        {/* Header */}
        <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 sm:p-2.5 rounded-xl border"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}15`,
                borderColor: `${currentThemeConfig.primaryHex}35`,
                color: currentThemeConfig.primaryHex
              }}
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-100 leading-tight">BMI & Daily Calorie Calc</h3>
              <p className="text-[11px] sm:text-xs text-stone-400">Discover baseline metrics & training roadmap</p>
            </div>
          </div>
          <button
            onClick={closeBMICalculator}
            className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto">

          {/* Unit & Gender Switcher */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Measurement Units</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => handleUnitChange('metric')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    unit === 'metric'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: unit === 'metric' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Metric (kg/cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitChange('imperial')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    unit === 'imperial'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: unit === 'imperial' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Imperial (lbs/ft)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Gender</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    gender === 'male'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: gender === 'male' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    gender === 'female'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: gender === 'female' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Age & Body Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Age (Years)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                placeholder="e.g. 28"
              />
            </div>

            {unit === 'metric' ? (
              <>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    min="1"
                    max="350"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                    placeholder="e.g. 75"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                    placeholder="e.g. 175"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Weight (lbs)</label>
                  <input
                    type="number"
                    min="1"
                    max="750"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                    placeholder="e.g. 165"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Height (ft & in)</label>
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-2 text-stone-100 text-sm text-center"
                      placeholder="ft (5)"
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-2 text-stone-100 text-sm text-center"
                      placeholder="in (9)"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1.5">Daily Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
            >
              <option value="sedentary">Sedentary (Desk job, minimal exercise)</option>
              <option value="light">Light Activity (1-2 light workouts/walks per week)</option>
              <option value="moderate">Moderate Activity (3-4 workouts per week)</option>
              <option value="very">Very Active (5+ intense workouts or active job)</option>
            </select>
          </div>

          {/* Results Card */}
          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs text-stone-400 block">Your Calculated BMI</span>
                <span className="text-3xl font-black" style={{ color: currentThemeConfig.primaryHex }}>
                  {bmi > 0 ? bmi : '--'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block">Category</span>
                <span className={`text-sm font-bold ${bmiCategory.color}`}>{bmiCategory.label}</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 italic">{bmiCategory.desc}</p>

            {/* Calories Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Fat Loss</span>
                <span className={`text-sm font-bold ${currentThemeConfig.textClass}`}>
                  {fatLossCalories > 0 ? fatLossCalories : '--'}
                </span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Maintenance</span>
                <span className="text-sm font-bold text-stone-200">
                  {maintenanceCalories > 0 ? maintenanceCalories : '--'}
                </span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Muscle Gain</span>
                <span className="text-sm font-bold text-emerald-400">
                  {muscleGainCalories > 0 ? muscleGainCalories : '--'}
                </span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                closeBMICalculator();
                openTrialModal();
              }}
              className={`w-full py-3.5 font-black rounded-xl flex items-center justify-center gap-2 shadow-xl text-sm transition-all ${currentThemeConfig.buttonClass}`}
            >
              <span>Get Full Custom Plan with {profile.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};


