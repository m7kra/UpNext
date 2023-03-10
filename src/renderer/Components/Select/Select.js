import S from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

export default function Select({options, value, onChange}) {
    const processedOptions = options.map((option) => {
        return {value: option, label: option};
    });
    const procesedValue = {value: value, label: value};

    return <S
        options={processedOptions}
        value={procesedValue}
        onChange={(e) => onChange(e.value)}
        styles={selectStyles}
        theme={selectTheme}
        isSearchable={false}
    />
}

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--color)' : 'var(--color-05)',
    })
};

const selectTheme = theme => ({
    ...theme,
    borderRadius: 'var(--border-radius)',
    colors: {
        ...theme.colors,
        neutral0: 'var(--bg-color)',
        neutral5: 'var(--color-005)',
        neutral10: 'var(--color-01)',
        neutral20: 'var(--color-02)',
        neutral30: 'var(--color-03)',
        neutral40: 'var(--color-04)',
        neutral50: 'var(--color-05)',
        neutral60: 'var(--color-07)',
        neutral70: 'var(--color-08)',
        neutral80: 'var(--color-09)',
        neutral90: 'var(--color)',
        primary: 'var(--color-02)',
        primary25: 'var(--color-005)',
        primary50: 'var(--color-01)',
    }
});