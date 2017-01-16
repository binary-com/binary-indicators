//+------------------------------------------------------------------+
//|                                                  WilliamBlau.mqh |
//|                        Copyright 2010, MetaQuotes Software Corp. |
//|                                              http://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2010, MetaQuotes Software Corp."
#property link      "http://www.mql5.com"
//+------------------------------------------------------------------+
//| Simple moving average on price array                             |
//+------------------------------------------------------------------+
int SimpleMAOnBufferWB(const int rates_total,const int prev_calculated,const int begin,
                     const int period,const double& price[],double& buffer[])
  {
   int i,limit;
//--- check for data
   if(period<=1 || rates_total-begin<period) return(0);
//--- save as_series flags
   bool as_series_price=ArrayGetAsSeries(price);
   bool as_series_buffer=ArrayGetAsSeries(buffer);
   if(as_series_price)  ArraySetAsSeries(price,false);
   if(as_series_buffer) ArraySetAsSeries(buffer,false);
//--- first calculation or number of bars was changed
   if(prev_calculated==0) // first calculation
     {
      limit=period+begin;
      //--- set empty value for first bars
      for(i=0;i<limit-1;i++) buffer[i]=0.0;
      //--- calculate first visible value
      double firstValue=0;
      for(i=begin;i<limit;i++)
         firstValue+=price[i];
      firstValue/=period;
      buffer[limit-1]=firstValue;
     }
   else limit=prev_calculated-1;
//--- main loop
   for(i=limit;i<rates_total && !IsStopped();i++)
      buffer[i]=buffer[i-1]+(price[i]-price[i-period])/period;
//--- restore as_series flags
   if(as_series_price)  ArraySetAsSeries(price,true);
   if(as_series_buffer) ArraySetAsSeries(buffer,true);
//---
    return(rates_total);
  }
//+------------------------------------------------------------------+
//|  Exponential moving average on price array                       |
//+------------------------------------------------------------------+
int ExponentialMAOnBufferWB(const int rates_total,const int prev_calculated,const int begin,
                            const int period,const double& price[],double& buffer[])
  {
   int    i,limit;
//--- check for data
   //if(period<=1 || rates_total-begin<period) return(0);
   if(period<1 || rates_total-begin<period) return(0);
   double dSmoothFactor=2.0/(1.0+period);
//--- save as_series flags
   bool as_series_price=ArrayGetAsSeries(price);
   bool as_series_buffer=ArrayGetAsSeries(buffer);
   if(as_series_price)  ArraySetAsSeries(price,false);
   if(as_series_buffer) ArraySetAsSeries(buffer,false);
//--- first calculation or number of bars was changed
   if(prev_calculated==0)
     {
      limit=period+begin;
      //--- set empty value for first bars
      for(i=0;i<begin;i++) buffer[i]=0.0;
      //--- calculate first visible value
      buffer[begin]=price[begin];
      for(i=begin+1;i<limit;i++)
         buffer[i]=price[i]*dSmoothFactor+buffer[i-1]*(1.0-dSmoothFactor);
     }
   else limit=prev_calculated-1;
//--- main loop
   for(i=limit;i<rates_total;i++)
      buffer[i]=price[i]*dSmoothFactor+buffer[i-1]*(1.0-dSmoothFactor);
//--- restore as_series flags
   if(as_series_price)  ArraySetAsSeries(price,true);
   if(as_series_buffer) ArraySetAsSeries(buffer,true);
//---
    return(rates_total);
  }
//+------------------------------------------------------------------+
//| Returns applied price as string                                  |
//+------------------------------------------------------------------+
string PriceName(
                 const int applied_price // applied price
                )
  {
   string name;
//---
   switch(applied_price)
     {
      case PRICE_CLOSE:    name="close";    break;
      case PRICE_OPEN:     name="open";     break;
      case PRICE_HIGH:     name="high";     break;
      case PRICE_LOW:      name="low";      break;
      case PRICE_MEDIAN:   name="median";   break;
      case PRICE_TYPICAL:  name="typical";  break;
      case PRICE_WEIGHTED: name="weighted"; break;
      default:             name="";         break;
     }
//---
    return(name);
  }
//+------------------------------------------------------------------+
//| Calculates applied price to PriceBuffer[]                        |
//+------------------------------------------------------------------+
int CalculatePriceBuffer(
                         const int applied_price,   // price type
                         const int rates_total,     // rates total
                         const int prev_calculated, // bars, calculated at previous call
                         const double &Open[],      // Open[]
                         const double &High[],      // High[]
                         const double &Low[],       // Low[]
                         const double &Close[],     // Close[]
                         double &Price[]            // target array
                        )
  {
   int    i,pos;
//---
   // at first call
   if(prev_calculated==0) pos=0;                 // calculate all values
   else                   pos=prev_calculated-1; // overwise calculate only last value
//---
   for(i=pos;i<rates_total;i++)
      switch(applied_price)
        {
         case PRICE_CLOSE:    Price[i]=Close[i]; break;
         case PRICE_OPEN:     Price[i]=Open[i];  break;
         case PRICE_HIGH:     Price[i]=High[i];  break;
         case PRICE_LOW:      Price[i]=Low[i];   break;
         case PRICE_MEDIAN:   Price[i]=(High[i]+Low[i])/2.0; break;
         case PRICE_TYPICAL:  Price[i]=(High[i]+Low[i]+Close[i])/3.0; break;
         case PRICE_WEIGHTED: Price[i]=(High[i]+Low[i]+Close[i]+Close[i])/4.0; break;
         default:             Price[i]=0.0; break;
        }
//---
    return(rates_total);
  }
//+------------------------------------------------------------------+
